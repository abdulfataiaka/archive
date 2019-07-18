class Response 
  attr_writer :status, :body
  attr_accessor :headers

  def initialize
    @status = nil
    @body = nil
    @headers = {}
  end

  def make
    [
      actual_status,
      actual_headers,
      actual_body
    ]
  end

  private

  def actual_body
    object = if @body.nil? then {} else @body end
    JSON.generate(object)
  end

  def actual_status
    if @status.is_a?(Integer)
      @status
    else
      200
    end
  end

  def actual_headers
    @headers = {} unless @headers.is_a?(Hash)
    unless @headers.key?("Content-Type")
      @headers["Content-Type"] = "application/json"
    end  
    @headers
  end
end