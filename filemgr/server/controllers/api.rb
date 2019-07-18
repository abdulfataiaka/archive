class Api < Controller
  include ApiControllerHelper

  def index
    message = messages[:endpoint_welcome]
    render(200, {
      message: message,
      username: Login.first.email,
      password: Login.first.password
    })
  end

  def not_found
    message = messages[:endpoint_notfound]
    render(404, { message: message })
  end

  def login
    puts "\n\n"
    puts params.inspect
    puts "\n\n"
    "Login Endpoint"
  end

  def register
    puts "\n\n"
    puts params.inspect
    puts "\n\n"
    "Register Endpoint"
  end
end