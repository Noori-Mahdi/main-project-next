'use client';
import DynamicIcon from '@/components/DynamicIcon';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import SelectBox from '@/components/SelectBox';
import {ProductType, target} from '@/types/type';
import {useEffect, useState} from 'react';
import ItemCard from '../ItemCard';
import SearchBox from '../SearchBox';
import {addProduct, getAllProduct} from '@/services/product';
import {getCategory} from '@/services/Category';

interface ProductListPropsType {
  productsList: ProductType[];
}
interface CategoryType {
  id: string;
  name: string;
}

const ProductList = () => {
  const [products, setProduct] = useState<ProductType[] | []>();
  const [category, setCategory] = useState<CategoryType[] | []>();
  const [showAddBox, setShowAddBox] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    status: '',
    price: '',
    discount: '',
    stock: '',
    description: '',
  });

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | target
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getAllProductAsync = async () => {
    try {
      const res = await getAllProduct();
      setProduct(res.data.data);
      console.log(res.data.data, 'resresres');
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryAsync = async () => {
    try {
      const res = await getCategory();
      setCategory(res.data.data);
      console.log(res.data.data, 'resresres');
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('categoryId', formData.categoryId);
    data.append('status', formData.status);
    data.append('price', formData.price.toString());
    data.append('discount', formData.discount.toString());
    data.append('stock', formData.stock.toString());
    data.append('description', formData.description);

    if (selectedFile) {
      data.append('image', selectedFile);
    } 

    try {
      await addProduct(data);
      getAllProductAsync();
      setShowAddBox(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAllProductAsync();
    getCategoryAsync();
  }, []);

  return (
    <>
      <div className=" p-2 w-full bg-neutral-700 overflow-autoh h-full">
        <div className="flex mb-2 w-full items-center justify-between">
          <SearchBox />
        </div>

        <div className="flex gap-2 ">
          <div
            onClick={() => setShowAddBox(true)}
            className="flex  flex-col cursor-pointer justify-center items-center w-52 h-72 bg-neutral-900 capitalize text-gray-300 rounded-sm border border-yellow-700 text-lg hover:text-yellow-700 hover:border-2 hover:brightness-125 transition-colors duration-300 ease-in-out"
          >
            <DynamicIcon
              iconName="faPlus"
              className="border border-dashed border-gray-300 text-gray-300 rounded-full p-3"
            />
            <div className="text-base mt-3 font-medium">add new item</div>
          </div>
          <ul>
            {products &&
              products.map((product, index) => (
                <li key={index}>
                  <ItemCard
                    id={product.id}
                    name={product.name}
                    discount={product.discount}
                    image={product.image}
                    likes={product.likes}
                    rating={product.rating}
                    price={product.price}
                    reviews={product.reviews}
                    sold={product.sold}
                    category={product.category}
                    categoryId={product.categoryId}
                    description={product.description}
                    status={product.status}
                    stock={product.stock}
                    views={product.views}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>

      <Modal
        className="w-8/12 h-5/6 border border-yellow-800 bg-neutral-900"
        onClose={() => setShowAddBox(false)}
        isOpen={showAddBox}
      >
        <div>
          <div className="flex mt-7 gap-2">
            <Input
              label="Product Name"
              name="name"
              type="text"
              icon="faBox"
              onChange={handleChange}
            />
            {category && (
              <SelectBox
                label="Category"
                name="categoryId"
                icon="faBoxes"
                options={category}
                onChange={(e) => handleChange(e)}
              />
            )}
            <SelectBox
              label="Status"
              name="status"
              icon="faDiagramProject"
              options={[
                {id: '0', name: 'Available'},
                {id: '1', name: 'Out of Stock'},
              ]}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex mt-7 gap-2">
            <Input
              label="Price"
              name="price"
              type="text"
              icon="faCoins"
              onChange={handleChange}
            />
            <Input
              label="Discount"
              name="discount"
              type="text"
              icon="faPercent"
              onChange={handleChange}
            />
            <Input
              label="Stock"
              name="stock"
              type="text"
              icon="faCubes"
              onChange={handleChange}
            />
          </div>

          <div className="flex mt-7 w-full gap-2">
            <Input
              label="Description"
              name="description"
              type="textarea"
              onChange={handleChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-gray-300 bg-neutral-700 rounded-sm  focus:rounded-md shadow-inner border ${error ? 'border-red-700' : 'border-gray-600'}  hover:shadow focus-within:shadow-lg focus-within:border-yellow-900 transition-all duration-300"
            />
          </div>

          <div className="flex justify-end mt-5">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-800"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductList;
