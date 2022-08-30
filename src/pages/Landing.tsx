import { FC } from "react";
import { Link } from "react-router-dom";

import Button from "../components/ui/button/Button";
import Image from "../components/ui/image/Image";

const Landing: FC = () => {
  return (
    <div className="flex justify-around min-h-screen px-10 py-8">
      <div className="w-2/6">
        <Image
          className="logo w-[180px] h-[50px] mb-20"
          url="	https://redux-toolkit-jobster.netlify.app/static/media/logo.35bb8e1d9b5745af32ff148cbee51dfa.svg"
          alt="jobster logo"
        />

        <div className="info">
          <h1 className="text-5xl font-extrabold text-secondary-800 mb-8">
            Job <span className="text-brand-500">Tracking</span> App
          </h1>
          <p className="text-secondary-500 leading-7 mb-5">
            Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
            fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
            crucifix heirloom meggings bicycle rights.
          </p>
          <Button className="btn btn-hero">
            <Link to="/login">Login/Register</Link>
          </Button>
        </div>
      </div>
      <Image
        url="	https://redux-toolkit-jobster.netlify.app/static/media/main.17b316de742b3a1202078c5ae18c8261.svg"
        alt="job hunt"
        className="img main-img"
      />
    </div>
  );
};

export default Landing;
