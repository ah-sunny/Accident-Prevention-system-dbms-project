

const Faq = () => {
  return (
    <div>

    <div className="text-center mx-auto mb-12 w-full md:w-full lg:w-[60%]">
        <h1 className="font-bold text-xl lg:text-3xl mb-3">Frequently Asked Questions</h1>
        <p>Have questions about accident prevention and safe driving?
            We have got you covered with clear answers.
            Explore details on danger zones, risk levels, and safety tips.
            Your safety is our top priority!</p>
    </div>

    <div className="w-full md:w-[80%] lg:w-[80%] mx-auto space-y-1">
        {/* FAQ 1 */}
        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
            <div className="collapse-title text-xl font-medium">1. How does the system identify dangerous zones?</div>
            <div className="collapse-content">
                <p>Our system collects and analyzes accident data from multiple sources, using AI-based algorithms to detect high-risk locations based on past incidents, road conditions, and traffic patterns.</p>
            </div>
        </div>
        
        {/* FAQ 2 */}
        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
            <div className="collapse-title text-xl font-medium">2. What does the danger percentage indicate?</div>
            <div className="collapse-content">
                <p>The danger percentage represents the likelihood of an accident occurring in a particular area based on historical data, traffic conditions, and environmental factors.</p>
            </div>
        </div>
        
        {/* FAQ 3 */}
        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
            <div className="collapse-title text-xl font-medium">3. How is the danger level determined?</div>
            <div className="collapse-content">
                <p>Danger levels are categorized based on accident frequency, severity, and surrounding hazards. We classify them as Low, Moderate, High, and Extreme.</p>
            </div>
        </div>
        
        {/* FAQ 4 */}
        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
            <div className="collapse-title text-xl font-medium">4. How can I receive safe driving suggestions?</div>
            <div className="collapse-content">
                <p>Our system provides real-time suggestions based on your current location and route. You can access safety tips through our website or mobile app.</p>
            </div>
        </div>
        
        {/* FAQ 5 */}
        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
            <div className="collapse-title text-xl font-medium">5. What should I do if I find myself in a dangerous zone?</div>
            <div className="collapse-content">
                <p>If you enter a high-risk area, reduce speed, stay alert, and follow traffic rules strictly. Our system will notify you of alternative safer routes if available.</p>
            </div>
        </div>
    </div>

</div>

  );
};

export default Faq;