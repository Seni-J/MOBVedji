import {useBasketContainer} from './BasketContainer';
import {useStockContainer} from './StockContainer';
import {createContainer} from 'unstated-next';

export const BasketContainer = createContainer(useBasketContainer);
export const StockContainer = createContainer(useStockContainer);