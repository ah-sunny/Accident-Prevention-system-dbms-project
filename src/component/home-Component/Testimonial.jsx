import { GoCodeReview } from "react-icons/go";


const Testimonial = () => {
  return (
    <div>
  <div className="text-center mx-auto mb-12 lg:w-[50%] p-2">
    <h1 className="font-bold text-xl lg:text-3xl mb-3">What People Say?</h1>
    <p>See what our users have to say! Real experiences shared by drivers who have benefited from our accident prevention system.</p>
  </div>

  <div className="flex flex-col justify-center items-center lg:flex-row gap-5">
    {/* Testimonial 1 */}
    <div className="card bg-base-100 h-72 w-96 shadow-xl">
      <div className="card-body">
        <p> <GoCodeReview className="size-14 mx-auto" /> </p>
        <h2 className="card-title">Life-Saving System!</h2>
        <p>This system alerted me about a dangerous zone ahead, helping me avoid a major accident. I feel much safer on the road now.</p>
        <p>- Mark D.</p>
      </div>
    </div>

    {/* Testimonial 2 */}
    <div className="card bg-base-100 h-72 w-96 shadow-xl">
      <div className="card-body">
        <p> <GoCodeReview className="size-14 mx-auto" /> </p>
        <h2 className="card-title">Must-Have for Every Driver!</h2>
        <p>Knowing the danger level and risk percentage of different areas has completely changed how I drive. Highly recommended!</p>
        <p>- Linda K.</p>
      </div>
    </div>

    {/* Testimonial 3 */}
    <div className="card bg-base-100 h-72 w-96 shadow-xl">
      <div className="card-body">
        <p> <GoCodeReview className="size-14 mx-auto" /> </p>
        <h2 className="card-title">Smart and Reliable!</h2>
        <p>The system&apos;s suggestions on how to drive safely are very practical. It’s like having a co-pilot ensuring my safety.</p>
        <p>- Jason M.</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default Testimonial;