import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const Page404: React.FC = () => {
  const { shopId, tableId } = useOutletContext<{
    shopId: string;
    tableId: string;
  }>();

  return (
    <main className="grid place-items-center bg-white h-screen overflow-hidden">
      <div className="text-center">
        <h1 className="font-extrabold dark:text-red-600" content="404" />
        <h1
          className="text-indigo-600 dark:text-indigo-600"
          content="Page not found!"
        />

        <p className="mt-6 text-base leading-7 text-white-600 dark:text-white-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            id={"goBack-btn"}
            to={`/menu/shop/${shopId}/table/${tableId}`}
            className={"access-link"}
            children={
              <p>
                <span aria-hidden="true">&larr;</span> Go back home
              </p>
            }
          />
          <Link
            id={"contact-btn"}
            to={`/menu/shop/${shopId}/table/${tableId}/contact-us`}
            className={"access-link"}
            children={
              <p>
                Contact support <span aria-hidden="true">&rarr;</span>
              </p>
            }
          />
        </div>
      </div>
    </main>
  );
};
export default Page404;
