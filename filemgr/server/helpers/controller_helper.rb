module ControllerHelper
  def params= params
    instance_variable_set(
      "@params",
      Params.new(params)
    )
  end

  def messages
    {
      endpoint_welcome: "Welcome to file manager endpoints",
      endpoint_notfound: "Endpoint does not exist",
    }
  end
end
