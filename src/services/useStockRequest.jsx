import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import {
  fetchFail,
  fetchStart,
  getFirmsSuccess,
  getSalesSuccess,
  getStockSuccess,
} from "../features/stockSlice"

const useStockRequest = () => {
  const { axiosToken } = useAxios()
  const dispatch = useDispatch()

  // const getFirms = async () => {
  //   dispatch(fetchStart())
  //   try {
  //     const { data } = await axiosToken("/firms")
  //     dispatch(getFirmsSuccess(data.data))
  //   } catch (error) {
  //     dispatch(fetchFail())
  //     console.log(error)
  //   }
  // }

  // const getSales = async () => {
  //   dispatch(fetchStart())
  //   try {
  //     const { data } = await axiosToken("/sales")
  //     dispatch(getSalesSuccess(data.data))
  //   } catch (error) {
  //     dispatch(fetchFail())
  //     console.log(error)
  //   }
  // }

  const getStock = async (path = "firms") => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosToken(`/${path}`)
      const stockData = data.data
      dispatch(getStockSuccess({ stockData, path }))
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
    }
  }

  const deleteStock = async (path = "firms", id) => {
    dispatch(fetchStart())
    try {
      await axiosToken.delete(`/${path}/${id}`)
      getStock(path)
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
    }
  }

  // return { getFirms, getSales }

  return { getStock, deleteStock }
}

export default useStockRequest
