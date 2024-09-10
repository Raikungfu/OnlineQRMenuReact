import React from "react";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { CoffeeShop } from "../../Type/CoffeeShop";
import { useOutletContext } from "react-router-dom";

const CoffeeShopAbout: React.FC = () => {
  const { infoShop } = useOutletContext<{
    infoShop: CoffeeShop;
  }>();

  console.log(infoShop);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative">
        <img
          src={infoShop.CoverImage}
          alt="Cover"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full flex flex-row justify-between">
          <div className="flex items-center">
            <img
              src={infoShop.Avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white mr-4"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold">{infoShop.Name}</h1>
              <p className="text-lg">{infoShop.Slogan}</p>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            {infoShop.Facebook && (
              <IconButton
                href={infoShop.Facebook}
                target="_blank"
                color="primary"
              >
                <FacebookIcon />
              </IconButton>
            )}
            {infoShop.Instagram && (
              <IconButton
                href={infoShop.Instagram}
                target="_blank"
                color="secondary"
              >
                <InstagramIcon />
              </IconButton>
            )}
            {infoShop.Twitter && (
              <IconButton
                href={infoShop.Twitter}
                target="_blank"
                color="primary"
              >
                <TwitterIcon />
              </IconButton>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Thông tin</h2>
        <p className="text-lg mb-2">
          <strong>Địa chỉ:</strong> {infoShop.Location}
        </p>
        <p className="text-lg mb-2">
          <strong>Hotline:</strong> {infoShop.Hotline}
        </p>
        <p className="text-lg mb-2">
          <strong>Email:</strong> {infoShop.Email}
        </p>
        <p className="text-lg mb-2">
          <strong>Website:</strong>{" "}
          <a href={infoShop.Website} className="text-blue-600 hover:underline">
            {infoShop.Website}
          </a>
        </p>
        <p className="text-lg mb-2">
          <strong>Mô tả:</strong> {infoShop.Description}
        </p>
        <p className="text-lg mb-2">
          <strong>Giờ mở cửa:</strong> {infoShop.OpeningHours}
        </p>
      </div>
    </div>
  );
};

export default CoffeeShopAbout;
