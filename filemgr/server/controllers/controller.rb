class Controller
  include ControllerHelper
  attr_reader :params

  def initialize
    @params = {}
  end

  def render status, body = nil, headers = nil
    response = Response.new
    response.status = status
    response.body = body
    response.headers = headers
    response.make
  end
end
