require 'forecast_io'

ForecastIO.api_key = '6a50e05d89a12f5332abcf4f715e49b6'

def weather(lat, lng, name)
  forecast = ForecastIO.forecast(lat, lng)
  puts "\n"
  puts "Right now in #{name}: #{forecast['daily']['summary']}"
  puts "Temperature: #{forecast['currently']['temperature']}\xC2\xB0"
  puts "---------------------------------------------"
  forecast['daily']['data'].each do |daily|
    puts Time.at(daily["time"]).strftime("%A")
    puts daily["summary"]
    puts "Tempature max: #{daily['temperatureMax']}\xC2\xB0"
    puts "Tempature min: #{daily['temperatureMin']}\xC2\xB0"
    puts "---------------------------------------------"
  end
  puts "\n"
end

locations = {
  # 'Staten Island' => {
  #   'latitude' => '40.5647818',
  #   'longitude' => '-74.286905'
  # },
  'Manhattan' => {
    'latitude' => '40.7591704',
    'longitude' => '-74.0392715'
  }
}

locations.each do |k, v|
  lat = v['latitude']
  lng = v['longitude']
  name = k
  weather(lat, lng, name)
end
