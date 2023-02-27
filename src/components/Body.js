import { restaurantList } from "../config";
import Restuarantcard from "./Restuarantcard";
import { useEffect, useState } from "react";
import Shimmer from "./shimmer";

function filterData(searchTxt, restaurants) {
  const filteredData = restaurants.filter((restaurant) => {
    return restaurant.data.name.toLowerCase().includes(searchTxt.toLowerCase());
  });
  return filteredData;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect for one time call getRestraurants using emptuy dependecy array
  useEffect(() => {
    getRestaurants(); //api call
  }, []);

  //async fn getRestaurants to fetch api data
  async function getRestaurants() {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.943811700000001&lng=76.3275467&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log(json);
      setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
      setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    } catch (error) {
      console.error(error);
      console.log("kkkkkkkkkkkkkk", error);
      // handle error
    }
  }

  //use seacrchData function and set condition if data is empty show error mesage 
  const searchData = (searchTxt, restaurants)=>{
    if (searchTxt !== ""){
        const data =filterData(searchTxt, restaurants)
        setFilteredRestaurants(data)
        setErrorMessage("")
        if(data.lenth===0){
            setErrorMessage("No matches restaurant found");
        }
    }else{
        setErrorMessage("");
        setFilteredRestaurants(restaurants);
    }
  }

  //if all resturants is empty , dont reneder resturants cards
  if (!allRestaurants) return null;

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="search a resturant you want"
          value={searchTxt}
          onChange={(e) => {
            setSearchTxt(e.target.value);
          }}
        />
        <button
          className="search-btn"
          placeholder="Search"
          onClick={() => {
            // setRestaurants(searchTxt ? filterData(searchTxt, restaurantList) : restaurantList);
            // user click on button searchData function is called
            // const Data = filterData(searchTxt, restaurants);
            // setRestaurants(Data);
            searchData(searchTxt, allRestaurants);
          }}
        >
         search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
          {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
          {filteredRestaurants.map((restaurant) => {
            return (
              <Restuarantcard key={restaurant.data.id} {...restaurant.data} />
            );
          })}
        </div>
      )}
      {/* <div className="restaurant-list">
        {filteredRestaurants.map((restaurant) => {
          return (
            <Restuarantcard key={restaurant.data.id} {...restaurant.data} />
          );
        })}
      </div> */} 
    </>
  );
};

export default Body;
