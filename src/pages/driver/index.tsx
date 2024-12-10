import React from 'react';
import useStyles from './style';
import classNames from 'classnames';
import Navbar from '@/components/ui/navbar';

type TransactionProps = {
  transactionId: number;
  user: string;
  product: string;
  total: number | undefined;
  description: string;
  isPaid: boolean;
};

const DriverMenu: React.FC<TransactionProps> = ({
  transactionId,
  user,
  product,
  total,
  description,
  isPaid,
}) => {
  const handleSendOrder = () => {
    alert(`Order ${transactionId} berhasil dikirim!`);
  };

  const handleCancelOrder = () => {
    alert(`Order ${transactionId} dibatalkan!`);
  };

  const styles = useStyles();

  return (
    <>
    <Navbar />
    <div>
    <h2 className={classNames('detail-transaksi',styles.detailTransaksi)}>Daftar Order</h2>
    <div className={classNames('card-box',styles.cardBox)}>  
      <div className="mb-6 space-y-2 text-gray-700">
        <p><strong>ID Transaksi:</strong> {transactionId}</p>
        <p><strong>User:</strong> {user}</p>
        <p><strong>Produk:</strong> {product}</p>
        <p>
          <strong>Total:</strong> Rp
          {total !== undefined && typeof total === 'number'
            ? total.toLocaleString()
            : 'N/A'}
        </p>
        <p>
          <strong>Deskripsi:</strong> {description} ({isPaid ? 'Sudah Bayar' : 'Belum Bayar'})
        </p>
      </div>
      <div className="flex justify-center space-y-4 flex-col ">
        <button
          onClick={handleSendOrder}
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Kirim Order
        </button>
        <button
          onClick={handleCancelOrder}
          className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Batal
        </button>
      </div>
    </div>
    </div>
    </>
  );
};

export default DriverMenu;
