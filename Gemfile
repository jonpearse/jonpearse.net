source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

# Basic stuff
gem 'rails',  '~> 5.2.4'
gem 'mysql2', '~> 0.5.3'
gem 'haml-rails', '~> 2.0'

# Use devise for user management
gem 'devise', '~> 4.5'
gem 'two_factor_authentication', '~> 2.1'
gem 'rqrcode', '~> 1.1'

# Other useful gems
gem 'will_paginate', '~> 3.1'
gem 'babosa', '~> 1.0'
gem 'jbuilder', '~> 2.10'
gem 'image_processing', '~> 1.10'
gem 'simple_ar_localizer', '~> 1.0'
gem 'browser', '~> 3.0.3'

# Use scenic to make stats easier
gem 'scenic', '~> 1.5.2'
gem 'scenic-mysql', '~> 0.1.0'

# And sidekiq for processing
gem 'sidekiq', '~> 5.2.8'
gem 'sidekiq-cron', '~> 1.1.0'
gem 'sidekiq-failures', '~> 1.0.0'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Stuff used in rake
gem 'colorize', '~> 0.8.1'
gem 'rake-progressbar', '~> 0.0.5', require: false

group :development do

  # Use Puma as the app server
  gem 'puma', '~> 4.3'

  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.3'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # Let’s pull in some prettyprint
  gem 'awesome_print', '~> 1.8'

  # Capistrano is awesome
  gem 'capistrano', '~> 3.11.2'
  gem 'capistrano-bundler', '~> 1.6.0'
  gem 'capistrano-rails', '~> 1.4.0'
  gem 'capistrano-rvm', '~> 0.1.2'
  gem 'capistrano-passenger', '~> 0.2.0'
  gem 'capistrano-sidekiq', '~> 1.0.3'

  # Also let’s use pry
  gem 'pry', '~> 0.12.2'

  # shush!
  gem 'active_storage_silent_logs', '~> 0.1.1'

end
