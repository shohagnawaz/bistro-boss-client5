import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-10 my-10">
            <SectionTitle
                subHeading={"Check it out"}
                heading={"Featured Item"}
            ></SectionTitle>
            <div className="md:flex justify-center items-center pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>August 2025</p>
                    <p className="uppercase">Where can I get some?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        Explicabo ducimus natus culpa cupiditate aspernatur libero? 
                        Labore animi impedit reprehenderit, officiis delectus, rerum, 
                        accusantium velit at tenetur vero distinctio. Voluptatibus qui 
                        accusantium doloribus numquam culpa labore at sit quaerat ut 
                        illo neque placeat accusamus nulla repellat, nemo dolore officiis iure dolores.
                    </p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;