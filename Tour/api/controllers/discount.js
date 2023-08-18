import Discount from "../models/Discount.js";

export const getAllDiscount = async (req, res, next) => {
    try {
      const discounts = await Discount.find();
      res.status(200).json(discounts);
    } catch (err) {
      next(err);
    }
};

// export const getDiscount = async (req, res, next) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     res.status(200).json(service);
//   } catch (err) {
//     next(err);
//   }
// };

export const deleteDiscount = async (req, res, next) => {
  const discountId = req.params.id;
  try {
    await Discount.findByIdAndDelete(discountId);
    res.status(200).json("Dịch vụ này đã bị xóa!");
  } catch (err) {
    next(err);
  }
};

export const checkDiscount = async (req, res, next) => { 
    try {
        const code = req.params.code;
        let discount = await Discount.findOne({ code });
        if (discount) {
            const today = new Date();
            if (today <= new Date(discount.endDate) && today >= new Date(discount.startDate)) {

                let remain = discount.total - discount.used;
                if (remain <= 0) {
                    return res.json({status: false, message: "Mã code đã hết lượt sử dụng"});
                }
                
                return res.json({status: true, discount: discount})
            } else {
                return res.json({status: false, message: "Mã code đã hết hạn hoặc chưa đến ngày sử dụng"})
            }
        }
        return res.json({status: false, message: "Mã code không tồn tại"})
    } catch (err) {
        return res.json({status: false, message: "Mã code không tồn tại"})
    }
}

export const createDiscount = async (req, res, next) => {
  try {
    let code = req.body.code;
    let d = await Discount.findOne({ code });
    if (d) {
        return res.status(400).json({ message: "Mã code giảm giá không được trùng", type: "error" });
    } else {
        let discount = new Discount(req.body);
        await discount.save();
        console.log("Tạo mã giảm giá thành công")
        return res.status(400).json({ message: "Tạo mã giảm giá thành công", type: "success" });
    }
  } catch (err) {
    next(err);
  }
};