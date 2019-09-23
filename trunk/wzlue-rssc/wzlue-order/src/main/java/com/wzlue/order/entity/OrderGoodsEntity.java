package com.wzlue.order.entity;

import java.io.Serializable;
import java.util.Date;
import java.math.BigDecimal;


/**
 * 订单商品
 * 
 * @author wzlue
 * @email wzlue.com
 * @date 2018-07-26 10:25:16
 */
public class OrderGoodsEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键
	private Long id;
	//订单id
	private String orderNumber;
	//商品id
	private Long goodsId;
	//商品名称
	private String goodsName;
	//商品图片
	private String picUrl;
	//购买数量
	private Integer buyNum;
	//商品原价
	private BigDecimal price;
	//商品原非会员价
	private BigDecimal costPrice;
	//商品原会员价
	private BigDecimal vipPrice;
    //订单实体
	private OrderEntity orderEntity;
	//规格1id
	private Long specId;
	//规格2 id
	private Long specIdTwo;
	//规格1名称
	private String specName;
	//规格2名称
	private String specNameTwo;
	//规格主id
	private Long goodsSpecId;

	public Long getGoodsSpecId() {
		return goodsSpecId;
	}

	public void setGoodsSpecId(Long goodsSpecId) {
		this.goodsSpecId = goodsSpecId;
	}

	public OrderEntity getOrderEntity() {
		return orderEntity;
	}

	public Long getSpecId() {
		return specId;
	}

	public void setSpecId(Long specId) {
		this.specId = specId;
	}

	public Long getSpecIdTwo() {
		return specIdTwo;
	}

	public void setSpecIdTwo(Long specIdTwo) {
		this.specIdTwo = specIdTwo;
	}

	public String getSpecName() {
		return specName;
	}

	public void setSpecName(String specName) {
		this.specName = specName;
	}

	public String getSpecNameTwo() {
		return specNameTwo;
	}

	public void setSpecNameTwo(String specNameTwo) {
		this.specNameTwo = specNameTwo;
	}

	public void setOrderEntity(OrderEntity orderEntity) {
		this.orderEntity = orderEntity;
	}

	public BigDecimal getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}

	public BigDecimal getVipPrice() {
		return vipPrice;
	}

	public void setVipPrice(BigDecimal vipPrice) {
		this.vipPrice = vipPrice;
	}

	/**
	 * 设置：主键
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：主键
	 */
	public Long getId() {
		return id;
	}
	/**
	 * 设置：订单id
	 */
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	/**
	 * 获取：订单id
	 */
	public String getOrderNumber() {
		return orderNumber;
	}
	/**
	 * 设置：商品id
	 */
	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}
	/**
	 * 获取：商品id
	 */
	public Long getGoodsId() {
		return goodsId;
	}
	/**
	 * 设置：商品名称
	 */
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	/**
	 * 获取：商品名称
	 */
	public String getGoodsName() {
		return goodsName;
	}
	/**
	 * 设置：商品图片
	 */
	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}
	/**
	 * 获取：商品图片
	 */
	public String getPicUrl() {
		return picUrl;
	}
	/**
	 * 设置：购买数量
	 */
	public void setBuyNum(Integer buyNum) {
		this.buyNum = buyNum;
	}
	/**
	 * 获取：购买数量
	 */
	public Integer getBuyNum() {
		return buyNum;
	}
	/**
	 * 设置：商品原价
	 */
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	/**
	 * 获取：商品原价
	 */
	public BigDecimal getPrice() {
		return price;
	}
}