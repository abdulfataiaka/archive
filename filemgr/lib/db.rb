require "active_record"
require_relative "./support/db_helper"

module DB
  extend DBHelper

  def self.dbconfig
    fetch
  end

  def self.create
    config = dbconfig
    connect_with_server(config) do |error, connection|
      return error unless error.nil?
      connection.create_database(config[:database])
      return true
    end
  end

  def self.drop
    config = dbconfig
    connect_with_server(config) do |error, connection|
      return error unless error.nil?
      connection.drop_database(config[:database])
      return true
    end
  end

  def self.establish_connection
    config = dbconfig
    connect_with_database(config) do |error, connection|
      return yield(error) unless error.nil?
      return yield(nil, connection, config[:database]) if block_given?
    end
  end

  def self.migrate
    connect_with_database(dbconfig) do |error, connection|
      return error unless error.nil?
      return messages[:no_migrations] unless connection.migration_context.any_migrations?
      return messages[:no_need_to_migrate] unless connection.migration_context.needs_migration?
      connection.migration_context.migrate
      return true
    end
  end

  def self.rollback
    connect_with_database(dbconfig) do |error, connection|
      return error unless error.nil?
      return messages[:cannot_rollback] unless rollback_possible?(connection)
      connection.migration_context.down
      return true
    end
  end

  def self.seed
    connect_with_database(dbconfig) do |error, connection|
      return error unless error.nil?
      execute_seeders
      return true
    end
  end
end
