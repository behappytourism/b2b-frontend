import React, {useState, useEffect} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { setPickPlaceForWithoutHotel } from '../../../../redux/slices/quotationSlice';
import { useDispatch } from 'react-redux';



function EditGooglePlaces() {

  const [selectedPlace, setSelectedPlace] = useState(null);
  const dispatch = useDispatch()

    useEffect(()=>{
      if(selectedPlace && selectedPlace?.value?.place_id){
        dispatch(setPickPlaceForWithoutHotel({placeId: selectedPlace?.value?.place_id}))
      }
    }, [selectedPlace])

    console.log(selectedPlace);


  return (
    <div>
     <GooglePlacesAutocomplete
      apiKey="AIzaSyA6qMfsMovR4sRbC8bu6zMNMH3brgzxwW4"
      selectProps={{
        onChange:setSelectedPlace
      }}
    />
    </div>
  )
}

export default EditGooglePlaces
