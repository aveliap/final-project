import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFaqDonate, fetchFAQs } from "@/redux/landing/faqSlice";

export default function FAQ() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {faqItems, donateItems} = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(fetchFAQs());
    dispatch(fetchFaqDonate());
  }, [dispatch]);

  return (
    <div className="p-5 md:p-12 lg:p-20">
      <h2 className="text-3xl font-bold text-black mb-4 lg:mr-52">
        Find Answers to Your Questions about CareMate
      </h2>
      <p className="text-lg text-gray-700 md:text-xl">
        Learn more about fundraising and donating in CareMate
      </p>
      <button className=" bg-[#e17153] text-white rounded-3xl px-6 py-2 text-lg mt-5" onClick={() => navigate("/partner/signup")}>
        Register Now
      </button>

      <h2 className="text-2xl font-medium text-black mb-4 mt-12">
        Question about fundraising
      </h2>

      {faqItems.map((item, index) => (
        <div key={index} className="collapse collapse-plus bg-white mb-4">
          <input
            type="radio"
            name="faq-accordion"
            defaultChecked={index === 0}
          />
          <div className="collapse-title text-xl font-medium text-black">
            {item.question}
          </div>
          <div className="collapse-content text-black text-justify">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
      <h2 className="text-2xl font-medium text-black mb-4 mt-12">
        Question about donating
      </h2>
      {donateItems.map((item, index) => (
        <div key={index} className="collapse collapse-plus bg-white mb-4">
          <input
            type="radio"
            name="faq-accordion"
            defaultChecked={index === 0}
          />
          <div className="collapse-title text-xl font-medium text-black">
            {item.question}
          </div>
          <div className="collapse-content text-black text-justify">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
