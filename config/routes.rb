Rails.application.routes.draw do

  # General devise stuff
  devise_for :users, path: 'user'

  # Admin namespace
  namespace :admin, path: :m do

    root to: 'dashboard#home'

    # sidekiq
    require 'sidekiq/web'
    require 'sidekiq/cron/web'
    authenticate :user do
      mount Sidekiq::Web => 'sidekiq'
    end

    # stats stuff
    scope path: :stats do

      get '/',    to: redirect('/m')

      get 'data', to: 'dashboard#get_stats', as: 'stats_data'

      # by date (only)
      get 'date', to: 'dashboard#stats_by_date', as: 'date_stats', defaults: { pa: :date }

      # various UA axes
      get 'ua/:ua/:v',  to: 'dashboard#stats_by_ua', as: 'ua_version_stats', defaults: { pa: :ua }, constraints: { v: /[\d\.]+/ }
      get 'ua(/:ua)',   to: 'dashboard#stats_by_ua', as: 'ua_stats'

      # Country stats
      get 'country/:c', to: 'dashboard#stats_by_country', as: 'single_country_stats', constraints: { c: /_?[A-Z]{2}/ }, defaults: { pa: :country }
      get 'country',    to: 'dashboard#stats_by_country', as: 'country_stats'

      # Article stats
      get 'article',    to: 'dashboard#stats_by_article', as: 'article_stats'

    end

    # task-fu
    get '/tasks',     to: 'tasks#index'
    get '/tasks/sq',  to: 'tasks#sidekiq'

    # Blog stuff
    scope module: :blog do

      resources :articles, :categories, except: [ :show ] do
        member do

          get 'stats', as: :stats

          get 'destroy', as: :destroy
        end
      end

    end

    # Work stuffs
    scope module: :work do

      resources :projects, :clients, :techs, except: [ :show ] do
        member do
          get 'destroy', as: :destroy
        end
      end

    end

    # Media stuff
    scope module: :media do

      resources :media do
        collection do
          get 'select', as: :select
        end

        member do
          get 'destroy', as: :destroy
          get 'download', as: :download
        end
      end

    end

    # Auth stuff
    namespace :auth do

      get   'password', to: 'password#change'
      patch 'password', to: 'password#update'

      # 2FA stuff
      get   'two-factor', to: 'two_factor#setup'
      patch 'two-factor', to: 'two_factor#enable'
      get   'disable-two-factor', to: 'two_factor#cancel'
      patch 'disable-two-factor', to: 'two_factor#disable'

    end

  end

  # Site namespace
  scope module: :site do

    # Article paths
    get   'writing/:year(/:month)',   to: redirect( '/writing' ), constraints: { year: /[0-9]{4}/, month: /[0-9]{2}/ }
    get   'writing/about/:category',  to: 'articles#index',   as: :article_category
    post  'writing/:id',              to: 'articles#update',  as: :update_article
    get   'writing/:id',              to: 'articles#show'
    get   'writing/*url',             to: 'articles#show',    as: :_article
    get   'writing',                  to: 'articles#index',   as: :articles

    # Project paths
    get   'work/:year',               to: redirect('/projects'), constraints: { year: /[0-9]{4}/ }
    match 'work(/page/:page)',        to: 'projects#index',   as: :projects, via: [ :get, :post ]

    # Snippet update path
    post 'snippets/:id', to: 'snippets#update', as: :update_snippet
    get  'snippets/:id', to: 'snippets#show', as: :snippet

    # Better media segments
    get '/a/_/:blob_id(/:size)', to: 'storage#show', as: :_variation, constraints: { size: /[0-9a-z]+/ }

    # Static pages
    get 'about', to: 'pages#about'

    # redirects
    get '/r/:code', to: 'shortcodes#bounce', as: :shortcode

    # partial home
    get 'home.jhtml', to: 'pages#home', format: 'jhtml', as: :partial_root

    # dark mode
    get 'toggle-dark-mode', to: 'settings#toggle_dark_mode'

    # 404 in this namespace
    match '*unmatched_route', to: 'base#not_found', constraints: -> (req){ req.path.exclude?( 'rails/active_storage' )}, via: :all

    # root path
    root to: 'pages#home'

  end

  # redirects
  get '_/r/:code', to: redirect( '/r/%{code}' ) # 2.0 shortcode URLs
  get 'articles',                 to: redirect( '/writing' )                    # 1.x article URLs
  get 'articles/in/:category',    to: redirect( '/writing/about/%{category}' )  # 1.x article URLs
  get 'articles/*url',            to: redirect( '/writing/%{url}' )             # 1.x article URLs

  # feeds are now elsewhere
  rss_base = Rails.application.config.action_controller.asset_host
  get 'writing/feed-full',  to: redirect( "#{rss_base}/feeds/full.xml" )
  get 'writing/feed',       to: redirect( "#{rss_base}/feeds/summary.xml" )

end
