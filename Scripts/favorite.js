let nameIndex;
let favoriteChecker;
let favorites = GetFavorites();
let favorited;
let removal = false;

function saveToLocalStorageByName(name){
    //get current values that are saved into local storage
    //create an array of values to store into local storage
    favorites = GetFavorites();
    nameIndex = favorites;
    console.log(nameIndex);
    favoriteChecker = favorites.indexOf(name);
    console.log(favoriteChecker);
    if (favoriteChecker != -1){
        removal = true;
        console.log("Removing " + name + " from Favorites");
        RemoveFromFavorites(name);
    }else{
        removal = false;
        console.log("Adding " + name + " from Favorites");
        //add new name to our favorites array
        favorites.push(name);
        
        //save updated array to local storage
        localStorage.setItem('Favorites', JSON.stringify(favorites));
    }
    nameIndex = favorites;
    console.log(nameIndex);
    return removal;
}

function GetFavorites(){
    //get all of the values that are stored in favorties and local storage
    let localStorageData = localStorage.getItem('Favorites');

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function RemoveFromFavorites(name){
    favorites = GetFavorites();

    //Find the index of the name in local storage
    nameIndex = favorites.indexOf(name);

    //Remove the name from the array using the splice method
    favorites.splice(nameIndex, 1);

    //Save our updated array to local storage
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

function CheckFavorite(name){
    favoriteChecker = favorites.indexOf(name);
    if (favoriteChecker != -1){
        favorited = false
    }else{
        favorited = true;
    }
    return favorited;
}
export {saveToLocalStorageByName, GetFavorites, RemoveFromFavorites, CheckFavorite};