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
address = URI("#{baseurl}/1.1/trends/place.json?id=23424977")

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
tweetsJson = JSON.parse(response.body)[0]
trends  = tweetsJson["trends"]

puts "Twitter trends:"
puts "~~~~~~~~~~~~~~~"
trends.each do |tweet|
  if (tweet["tweet_volume"])
    puts "#{tweet["name"]}, #{tweet["tweet_volume"]} tweets "
  else
    puts "#{tweet["name"]}"
  end
end
