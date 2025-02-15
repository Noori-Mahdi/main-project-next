import ProductList from '@/components/ProductList';
import {getAllProduct} from '@/services/product';

const ItemsManagement = async () => {

  return (
    <div className="rounded-lg h-full w-full">
      <ProductList/>
    </div>
  );
};

export default ItemsManagement;
