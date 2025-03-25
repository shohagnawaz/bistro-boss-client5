import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const {name, category, recipe, price, _id} = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbibi and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      //
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
  };
  
  return (
    <div>
      <SectionTitle
        subHeading={"Refresh Info"}
        heading={"Update An Item"}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control my-6">
            <legend className="w-full">Recipe Name*</legend>
            <input
              type="text"
              defaultValue={name}
              className="input w-full"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              required
            />
          </div>

          <div className="flex gap-6">
            {/* category */}
            <div className="form-control my-6 w-full">
              <legend className="w-full">Category*</legend>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="select w-full"
              >
                <option disabled value={"default"}>
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
            <div className="form-control my-6 w-full">
              <legend className="w-full">Price*</legend>
              <input
                type="number"
                defaultValue={price}
                className="input w-full"
                {...register("price", { required: true })}
                placeholder="Price"
              />
            </div>
          </div>
          {/* Recipe Details */}
          <div className="fieldset w-full">
            <legend className="fieldset-legend w-full">Recipe Details</legend>
            <textarea
              defaultValue={recipe}
              {...register("recipe")}
              className="textarea h-36 w-full"
              placeholder="Bio"
            ></textarea>
          </div>

          <div>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-ghost"
            />
          </div>

          <button className="btn">
            Update Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
