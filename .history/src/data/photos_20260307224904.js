// To add your own photos:
// 1. Drop your images into public/images/
// 2. Update the "img" path below to match the filename
// 3. Set "cat" to the location/group you want
// 4. Write a description (or leave desc as "" to hide it)
//
// Vertical and horizontal photos both work fine.
// The masonry layout handles mixed orientations automatically.

const photos = [
  { id: 1, title: "Old Montreal Street", cat: "Montreal", img: "/images/old-montreal.jpg", desc: "Rolling hills bathed in warm evening light, shot on Ektar 100." },
  { id: 2, title: "Morning Fog", cat: "New England", img: "/images/morning-fog.jpg", desc: "A misty valley at dawn somewhere outside of Lynn." },
  { id: 3, title: "Coastal Cliffs", cat: "New England", img: "/images/coastal-cliffs.jpg", desc: "Dramatic cliffs meeting the Atlantic. The wind was unreal." },
  { id: 4, title: "Urban Geometry", cat: "Boston", img: "/images/urban-geometry.jpg", desc: "Lines and shadows in downtown Boston." },
  { id: 5, title: "Night Market", cat: "New York", img: "/images/night-market.jpg", desc: "Bustling street vendors after dark. Pushed the film to 800 for this one." },
  { id: 6, title: "Autumn Path", cat: "New England", img: "/images/autumn-path.jpg", desc: "A winding trail through fall foliage." },
  { id: 7, title: "Rain Reflections", cat: "New York", img: "/images/rain-reflections.jpg", desc: "" },
  { id: 8, title: "The Commute", cat: "New York", img: "/images/the-commute.jpg", desc: "Figures in motion through the station. Shot handheld at 1/60." },
  { id: 9, title: "Back Bay", cat: "Boston", img: "/images/back-bay.jpg", desc: "Late afternoon light on brownstones." },
];

export default photos;