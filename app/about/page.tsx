import Image from "next/image";
import me from "../assets/ratul.png";
const technologies = {
  frontend: [
    "Next.js",
    "React.js",
    "typeScript",
    "Axios",
    "Redux",
    "SHADCN",
    "GSAP",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "mongoose",
    "prisma",
    "rest apis",
    "postgresql",
  ],
};
const AboutPage = () => {
  return (
    <div className="p-6 lg:p-10 xl:p-20 lg:container lg:mx-auto min-h-screen flex flex-col items-center justify-around gap-20 lg:flex-row-reverse">
      <Image
        src={me}
        alt="Ratul"
        width={400}
        height={400}
        className="rounded-4xl"
      />
      <div className="space-y-12">
        <h1 className="text-5xl font-canela font-light">About</h1>
        <p className="text-2xl font-canela font-light">
          A Full Stack Developer From Bangladesh. I have 1+ years of hands-on
          experience in the industry. I am passionate about building
          user-friendly and efficient software solutions. I am not perfect
          'cause I never stopped learning.
        </p>
        <div className="flex justify-between items-start w-full">
          <div className="flex items-start gap-20">
            <div className="text-sm space-y-2 uppercase">
              <p>(Frontend)</p>
              <div>
                {technologies.frontend.map((item: string, index: number) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
            <div className="text-sm space-y-2 uppercase">
              <p>(Backend)</p>
              <div>
                {technologies.backend.map((item: string, index: number) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
