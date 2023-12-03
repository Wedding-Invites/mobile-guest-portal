import { fetchImageUrls } from 'google-photos-album-image-url-fetch';
import React, { useEffect } from 'react'
import Iframe from 'react-iframe';

// const fetchData = () => {
//     fetchImageUrls("https://photos.google.com/share/uMxYqSiZBAwCLLDo7").then((res) => {
//         console.log(res);
//     })
// }
// fetchData();  

// fetch("https://photos.app.goo.gl/uMxYqSiZBAwCLLDo7", {
//     mode: 'no-cors',
//     method: "post",
//     headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*"
//     }
// }).then((res) => res.json())
//     .then((res) => console.log(res));


function GalleryPhotosDrive({ imgId = 'uMxYqSiZBAwCLLDo7' }: { imgId: string }) {
    // useEffect(() => {
    //     // fetchData()
    // }, []);
    console.log(imgId)
    return (
        <iframe width="100%" height="1700px" src={"https://photos.app.goo.gl/uMxYqSiZBAwCLLDo7"}></iframe>
    )
    // return <Iframe url="https://photos.app.goo.gl/uMxYqSiZBAwCLLDo7"
    //     width="640px"
    //     height="320px"
    //     id=""
    //     className=""
    //     display="block"
    //     position="relative" />
}

export default GalleryPhotosDrive

// const main = async () => {
//     const re = await GooglePhotosAlbum.fetchImageUrls('https://photos.app.goo.gl/QCXy6XaKX5x1AynH8');
//     console.log(JSON.stringify(re, null, 2));
// };
// main().catch(er => console.error(er));

// fetchImageUrls