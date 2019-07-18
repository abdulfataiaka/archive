module EnvHelper
  def raw
    ENV['RACK_ENV']
  end
end
