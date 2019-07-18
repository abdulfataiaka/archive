module DBMigrate
  def rollback_possible?(connection)
    statuses = connection.migration_context.migrations_status
    statuses.select { |status| status[0] == "up" }.size > 0
  end
end
