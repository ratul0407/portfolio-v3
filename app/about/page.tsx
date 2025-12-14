import Image from "next/image";
import img1 from "../assets/parcel-phone.png";
import img2 from "../assets/parcel-yellow.jpg";
import img3 from "../assets/plantlife-mobile.png";
const AboutPage = () => {
  return (
    <div className="lg:container lg:mx-auto">
      <div className="min-h-screen w-full h-full overflow-hidden border border-red-500 ">
        <Image
          src={img1}
          alt="about"
          objectFit="cover"
          width={200}
          height={400}
          className=""
        />
      </div>
    </div>
  );
};

export default AboutPage;
