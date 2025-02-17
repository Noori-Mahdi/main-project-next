'use client';
import DynamicIcon from '@/components/DynamicIcon';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import SelectBox from '@/components/SelectBox';
import {ProductType, target} from '@/types/type';
import {useEffect, useState} from 'react';
import ItemCard from '../ItemCard';
import SearchBox from '../SearchBox';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
} from '@/services/product';
import {getCategory} from '@/services/Category';
import Button from '../Button';

interface ProductListPropsType {
  productsList: ProductType[];
}
interface CategoryType {
  id: string;
  name: string;
}

const ProductList = () => {
  const [products, setProduct] = useState<ProductType[] | []>();
  const [selectProduct, setSelectProduct] = useState<ProductType | null>(null);
  const [category, setCategory] = useState<CategoryType[] | []>();
  const [showAddBox, setShowAddBox] = useState(false);
  const [showEditeBox, setShowEditeBox] = useState(-1);
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

  const DeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      getAllProductAsync();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(
    selectProduct,
    'selectProductselectProductselectProductselectProduct'
  );
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append(
      'name',
      formData.name !== '' ? formData.name : (selectProduct?.name ?? '')
    );
    data.append(
      'categoryId',
      formData.categoryId !== ''
        ? formData.categoryId
        : (selectProduct?.categoryId ?? '')
    );
    data.append(
      'status',
      formData.status !== '' ? formData.status : (selectProduct?.status ?? '')
    );
    data.append(
      'price',
      formData.price.toString() !== ''
        ? formData.price.toString()
        : (selectProduct?.price.toString() ?? '')
    );
    data.append(
      'discount',
      formData.discount.toString() !== ''
        ? formData.discount.toString()
        : (selectProduct?.discount.toString() ?? '')
    );
    data.append(
      'stock',
      formData.stock.toString() !== ''
        ? formData.stock.toString()
        : (selectProduct?.stock.toString() ?? '')
    );
    data.append(
      'description',
      formData.description !== ''
        ? formData.description
        : (selectProduct?.description ?? '')
    );

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    try {
      if (!selectProduct) {
        await addProduct(data);
      } else {
        await editProduct(selectProduct.id,data);
      }

      setSelectProduct(null);
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

        <ul className="flex gap-2 ">
          <div
            onClick={() => {
              setSelectProduct(null), setShowAddBox(true);
            }}
            className="flex  flex-col cursor-pointer justify-center items-center w-52 h-72 bg-neutral-900 capitalize text-gray-300 rounded-sm border border-yellow-700 text-lg hover:text-yellow-700 hover:border-2 hover:brightness-125 transition-colors duration-300 ease-in-out"
          >
            <DynamicIcon
              iconName="faPlus"
              className="border border-dashed border-gray-300 text-gray-300 rounded-full p-3"
            />
            <div className="text-base mt-3 font-medium">add new item</div>
          </div>
          {products &&
            products.map((product, index) => (
              <li
                onMouseLeave={() => {
                  setShowEditeBox(-1);
                }}
                onMouseEnter={() => {
                  setShowEditeBox(index);
                }}
                className="relative"
                key={index}
              >
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
                {showEditeBox == index && (
                  <div className="flex justify-center items-center gap-3 absolute  top-0 w-full h-full z-20 bg-neutral-800 rounded-md bg-opacity-90">
                    <Button
                      className="px-2 py-1 capitalize font-semibold text-sm rounded-sm tracking-wide"
                      label="edite"
                      onClick={() => {
                        setSelectProduct(product), setShowAddBox(true);
                      }}
                    />
                    <Button
                      className="px-2 py-1 capitalize font-semibold text-sm rounded-sm tracking-wide"
                      label="delete"
                      onClick={() => {
                        DeleteProduct(product.id);
                      }}
                    />
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>

      <Modal
        className="w-9/12 h-5/6 border border-yellow-800 bg-neutral-900"
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
              defaultValue={selectProduct?.name}
            />
            {category && (
              <SelectBox
                label="Category"
                name="categoryId"
                icon="faBoxes"
                options={category}
                onChange={(e) => handleChange(e)}
                defaultValueId={selectProduct?.categoryId || ''}
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
              defaultValueId={selectProduct?.status || '0'}
            />
          </div>

          <div className="flex mt-7 gap-2">
            <Input
              label="Price"
              name="price"
              type="text"
              icon="faCoins"
              onChange={handleChange}
              defaultValue={selectProduct?.price.toString()}
            />
            <Input
              label="Discount"
              name="discount"
              type="text"
              icon="faPercent"
              onChange={handleChange}
              defaultValue={selectProduct?.discount.toString()}
            />
            <Input
              label="Stock"
              name="stock"
              type="text"
              icon="faCubes"
              onChange={handleChange}
              defaultValue={selectProduct?.stock.toString()}
            />
          </div>

          <div className="flex mt-7 w-full gap-2">
            <Input
              label="Description"
              name="description"
              type="textarea"
              onChange={handleChange}
              defaultValue={selectProduct?.description}
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
