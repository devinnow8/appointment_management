import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { applicationDetailsFetchRequest } from "../redux/reducer/application-detail";
import { categoryServiceListFetchRequest } from "../redux/reducer/category-service";
import ApplicationForm from "../components/home/application-form";

export default function Home() {
  const dispatch = useDispatch();
  const { categoryServiceList } = useSelector(
    (state) => state.categoryServiceList,
  );
  const { isLoading } = useSelector((state) => state.applicationDetails);
  const router = useRouter();
  const [categoryServiceOptions, setCategoryServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState([]);

  const handleContinue = (values) => {
    const details = {
      applicationId: values.application_id,
      dob: values.dob,
      serviceType: selectedService.label,
    };
    dispatch(
      applicationDetailsFetchRequest(details, (success) => {
        if (success) {
          router.push({
            pathname: "/book-appointment",
            query: { selectedService: selectedService.label },
          });
        }
      }),
    );

  };

  useEffect(() => {
    dispatch(categoryServiceListFetchRequest());
    if(categoryServiceList.length > 0) {
      const obtainedList =
      categoryServiceList.map((service) => {
        return {
          value:
            service?.categoryName.charAt(0).toUpperCase() +
            service?.categoryName.slice(1),
          label:
            service?.categoryName.charAt(0).toUpperCase() +
            service?.categoryName.slice(1),
        };
      });
    setCategoryServiceOptions(obtainedList);
    setSelectedService(obtainedList[0]);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="appointment-form">
        <ApplicationForm
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          categoryServiceOptions={categoryServiceOptions}
          handleContinue={handleContinue}
          isLoader={isLoading}
        />
      </section>
    </>
  );
}
