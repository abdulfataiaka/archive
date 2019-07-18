module DBConnect 
  def connect_with_database params
    connect_with_server(params, true) do |error, connection|
      yield(error, connection) if block_given?
    end
  end

  # this is the connection start method, so you
  # must always connect to server with this method
  # other other methods that depends on it
  def connect_with_server params, withdb = false
    result = verify_and_connect(params, withdb)
    params = connect_block_params(result)
    yield(*params) if block_given?
    close_active_connection
  end

  private

  def close_active_connection
    ActiveRecord::Base.clear_all_connections!
    nil
  end
  
  def active_connection
    begin
      ActiveRecord::Base.connection
    rescue
      nil
    end
  end

  def connect_block_params result
    return [result] if result.is_a?(String)
    [ nil, result[:connection] ]
  end

  def connect config
    begin
      ActiveRecord::Base.establish_connection(config)
      ActiveRecord::Base.connection
    rescue ActiveRecord::ActiveRecordError => error
      error.message
    end
  end

  def verify_and_connect params, withdb
    config = if withdb == true
      connect_hash_config_withdb(params) 
    else
      connect_hash_config(params)
    end

    return config if config.is_a?(String)
    connection = connect(config)
    return connection if connection.is_a?(String)

    # you can pass in other parameters from params later
    # and also pass it into the block params array above
    {
      connection: connection,
      database: params[:database]
    }
  end

  def connect_hash_config_withdb params
    config = connect_hash_config(params)
    return config if config.is_a?(String)
    database = params[:database]
    return messages[:dbname_not_configured] if database.nil?
    config[:database] = database
    config
  end

  def connect_hash_config params
    return params if params.is_a?(String)
    return messages[:invalid_config] unless params.is_a?(Hash)
    
    {
      adapter: 'postgresql',
      username: params[:username],
      password: params[:password],
      host: params[:host],
      port: params[:port],
      pool: params[:pool]
    }
  end
end
