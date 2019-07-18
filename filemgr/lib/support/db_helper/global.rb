module DBGlobal
  def rootdir
    dirpath = File.dirname(__FILE__)
    File.expand_path("../../../", dirpath)
  end

  def env
    env = ENV["RACK_ENV"]
    envs = %w(development production test)
    check = env.is_a?(String) && envs.include?(env.strip)
    if check then env.strip else nil end
  end

  def messages
    {
      no_migrations: "No migration files has been created",
      cannot_rollback: "No migrations has been run yet",
      no_need_to_migrate: "All migration files are up",
      connect_error: "Unable to connect to database",
      invalid_config: "Configuration invalid",
      dbname_not_configured: "Database name not yet configured",
      require_error: "require error",
      seeder_class_error: "seeder class error",
      bad_env_set: "No valid environment name set",
      no_config_found: "No database configuration loaded for environment",
      invalid_dburl: "Database url provided is not properly formed"
    }
  end
end
