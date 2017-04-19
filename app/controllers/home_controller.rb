class HomeController < ApplicationController
  def show
    @token = ENV["MAPBOX_TOKEN"]
  end
end
