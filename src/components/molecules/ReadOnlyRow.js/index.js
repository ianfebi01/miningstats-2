import React from 'react';
import { useEffect } from 'react';
import { convertDateMonth } from '../../../utils/ConvertDateMonth';
import { useDispatch, useSelector } from 'react-redux';
import { costsAllSelector, getAllCosts } from '../../../features/costsAllSlice';
const ReadOnlyRow = ({ selected }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCosts());
  }, [dispatch]);
  const costsAll = useSelector(costsAllSelector.selectAll);

  const selectedCost = costsAll.filter(
    (item) => convertDateMonth(item.date) == selected
  );

  return (
    <tbody>
      {selectedCost.map((item, index) => {
        return (
          <tr key={item._id}>
            <th className="is-borderless">{index + 1}</th>
            <td className="is-borderless">{item.detail}</td>
            <td className="is-borderless">{item.price}</td>
            <td className="is-borderless">ETH</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ReadOnlyRow;
