require "psych"

module DBParams
  # config.yml takes precedence over database url
  # set in environment.
  
  # it will only be used if configuration for the
  # environment is not set in config.yml file.
  def fetch
    params = fetch_params
    raw_config = process_dburl_or_pass(params)
    return raw_config if raw_config.is_a?(String)
    process_fetched_config(raw_config) 
  end

  private
  
  def fetch_params
    return messages[:bad_env_set] if env.nil?
    path = "./db/config.yml"
    config_file_path = File.expand_path(path, rootdir)

    begin
      data = Psych.load_file(config_file_path)
      check = data.is_a?(Hash) && data[env].is_a?(Hash)
      if check then data[env] else nil end
    rescue StandardError => error
      nil
    end
  end

  def parse_string_value value
    if value.is_a?(String) && value.strip != ""
      value.strip
    else
      nil
    end
  end
  
  def is_database_url url
    regex = /^postgres(ql)?:\/\/.+@.+\/.+$/
    url.is_a?(String) && !url.match(regex).nil?
  end

  def explode_database_url url
    result = split_database_url(url)
  
    {
      "username" => result[0],
      "password" => result[1],
      "host" => result[2],
      "port" => result[3],
      "database" => result[4],
    }
  end

  def split_database_url valid_dburl
    main = valid_dburl.split("://")[1]
    main_split = main.split("@")
    credentials = main_split[0]
    credentials_split = credentials.split(":")
    username = credentials_split[0]
    password = credentials_split[1]
    server_and_db = main_split[1]
    server_and_db_split = server_and_db.split("/")
    host_and_port = server_and_db_split[0]
    host_and_port_split = host_and_port.split(":")
    host = host_and_port_split[0]
    port = host_and_port_split[1]
    database = server_and_db_split[1]
    [ username, password, host, port, database]
  end

  def process_dburl_or_pass raw_config
    return raw_config if (
      raw_config.is_a?(String) || (
        !raw_config.nil? &&
        raw_config["database_url"].nil?
      )
    )
    
    database_url = raw_config["database_url"] unless raw_config.nil?
    database_url = ENV["DATABASE_URL"] if raw_config.nil? || database_url.nil?
  
    return messages[:no_config_found] if database_url.nil?
    return messages[:invalid_dburl] unless is_database_url(database_url)
    explode_database_url(database_url)
  end

  def process_fetched_config raw_config
    result = {}
    # process host
    host = parse_string_value(raw_config["host"])
    result[:host] = if host.nil? then "localhost" else host end
    # process port
    port = raw_config["port"]
    result[:port] = if port.is_a?(Integer) then port else 5432 end
    # process username
    result[:username] = parse_string_value(raw_config["username"])
    # process password
    result[:password] = parse_string_value(raw_config["password"])
    # process database
    result[:database] = parse_string_value(raw_config["database"])
    # set default pool size
    result[:pool] = 5
    result
  end
end
