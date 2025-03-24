import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";

const AddItems = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <SectionTitle
        subHeading={"What`s New"}
        heading={"Add an Item"}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control my-6">
            <legend className="w-full">Recipe Name*</legend>
            <input
              type="text"
              className="input"
              {...register("name", {required: true})}
              placeholder="Recipe Name"
              required
            />
          </div>

          <div className="flex gap-6">
            {/* category */}
            <div className="form-control my-6">
              <legend className="w-full">Category*</legend>
              <select {...register("category", {required: true})} className="select">
                <option disabled selected>
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* price */}
            <div className="form-control my-6">
              <legend className="w-full">Price*</legend>
              <input
                type="number"
                className="input"
                {...register("price", {required: true})}
                placeholder="Price"
              />
            </div>
          </div>
          {/* Recipe Details */}
          <div className="fieldset">
            <legend className="fieldset-legend">Recipe Details</legend>
            <textarea {...register("recipe")} className="textarea h-24" placeholder="Bio"></textarea>
          </div>

          <div>
            <input {...register("image", {required: true})} 
                type="file" className="file-input file-input-ghost" 
            />
          </div>

          <button className="btn">
            Add Item
            <FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
