require 'rubygems'
require 'oauth'
require 'json'

consumer_key = OAuth::Consumer.new(
    "3z3g8YSxbdLq2aAQmToK7EqYK",
    "SWSJ0eWiwfBIyrsp7QyER4VJkkZOKfWm03BClOi0MmZt6k7YXf")
access_token = OAuth::Token.new(
    "459876199-EsbCNQWe4eEfwz1BTvV1rrlbV1ERiJF1oaJRvnWH",
    "llqTSYlPQRjIDW5bN3RKjAgMEzRgfuIg4g7MuW90aK7m2")

# All requests will be sent to this server.
baseurl = "https://api.twitter.com"

# The verify credentials endpoint returns a 200 status if
# the request is signed correctly.
address = URI("#{baseurl}/1.1/statuses/home_timeline.json?exclude_replies=true&count=200&include_rts=false")

# Set up Net::HTTP to use SSL, which is required by Twitter.
http = Net::HTTP.new address.host, address.port
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_PEER

# Build the request and authorize it with OAuth.
request = Net::HTTP::Get.new address.request_uri
request.oauth! http, consumer_key, access_token

# Issue the request and return the response.
http.start
response = http.request request

# puts "The response status was #{response.code}"
tweets_json = JSON.parse(response.body)

tweets_json.each do |tweet|
  puts "#{tweet['user']['name']} - #{tweet['text']}"
  puts '*<><><><><><><><><><><><><><><><><><><><><>*'
end
