class AddIdentToPageviews < ActiveRecord::Migration[6.0]
  def up

    add_column :stats_pageviews, :ident, :string, limit: 32
    add_index :stats_pageviews, :ident
    execute "UPDATE stats_pageviews SET ident=md5(concat(session_id, url))"

    update_view :stats_deduped_pageviews, version: 2

  end

  def down

    remove_column :stats_pageviews, :ident
    update_view :stats_deduped_pageviews, version: 2

  end
end
