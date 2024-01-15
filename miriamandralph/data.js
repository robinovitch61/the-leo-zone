export const kids = 12;
export const grandKids = 21;
export const greatGrandKids = 7;
export const data = [
  {
    "id": "Years",
    "perYear": 1,
    "imgFile": "calendar.png",
    "prefix": "You've enjoyed",
    "suffix": "years together",
  },
  {
    "id": "Shabbat",
    "perWeek": 1,
    "imgFile": "shabbat.png",
    "prefix": "You've celebrated Shabbat",
    "suffix": "times together",
  },
  {
    "id": "Chanukah Candles",
    "perYear": 44,
    "imgFile": "menorah.png",
    "prefix": "You've lit",
    "suffix": "Chanukah candles together",
  },
  {
    "id": "Movies Seen",
    "perWeek": 1.3,
    "imgFile": "movie.png",
    "prefix": "You've seen",
    "suffix": "movies together",
  },
  {
    "id": "Presents Given",
    "perWeek": 0.8, // TODO: check
    "imgFile": "gift.png",
    "prefix": "You've given",
    "suffix": "presents to family",
  },
  {
    "id": "Trips to London",
    "number": grandKids - 3, // cl, sh, sa
    "imgFile": "london.png",
    "prefix": "You've taken",
    "suffix": "grandkids to London (or Vancouver!)",
  },
  {
    "id": "Vancouver/Winnipeg",
    "startDate": new Date("2005-01-01"), // TODO: confirm
    "perYear": 2,
    "imgFile": "road_trip.png",
    "prefix": "You've gone between Vancouver and Winnipeg",
    "suffix": "times",
  },
]
