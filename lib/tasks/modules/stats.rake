namespace :jjp2 do

  namespace :stats do

    desc "Reload GeoIP data from MaxMind"
    task reload_ip_blocks: [ 'jjp2:geoip:load' ]

    desc "Aggregate stats"
    task aggregate: :environment do

      require Rails.root.join( 'lib/tasks/helpers/stats_helper' )
      StatsHelper::aggregate()

    end

  end

end
