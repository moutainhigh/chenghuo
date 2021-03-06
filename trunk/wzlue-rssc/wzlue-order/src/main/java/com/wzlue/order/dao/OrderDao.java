package com.wzlue.order.dao;

import com.wzlue.order.entity.OrderEntity;
import com.wzlue.common.base.BaseDao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 订单
 * 
 * @author wzlue
 * @email wzlue.com
 * @date 2018-07-26 10:25:17
 */
@Mapper
public interface OrderDao extends BaseDao<OrderEntity> {

	void updateByOrderNumber(OrderEntity order);

	OrderEntity queryByOrderNumber(String orderNumber);

	Integer queryOrderCount(Map<String, Object> map);
	
	List<Map<String, Object>> queryOrderChart();

	OrderEntity queryTime(String orderNumber);

	double todayPrice();
	double yesterdayPrice();
	int okOrder();
	double keDanPrice();
	OrderEntity queryOrder(String orderNumber);

	List<Map<String, Object>> exportOrder();

}
