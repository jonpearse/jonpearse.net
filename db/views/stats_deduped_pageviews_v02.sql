SELECT session_id, url, content_type, content_id
FROM stats_pageviews
GROUP BY ident
ORDER BY session_id
