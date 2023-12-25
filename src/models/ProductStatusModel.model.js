import { Model } from 'objection';

class ProductStatusModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'product_statuses'; }

  $beforeInsert() {
    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date;
  }

  static async addName(name, user_id) {
    // const data = await ProductStatusModel.query().where('name', '=', name).andWhere('user_id', '=', user_id).first();
    const newData = await ProductStatusModel.query().select('user_id').where('name', '=', name).first();
    console.log('====================================');
    // console.log(data,'dat');
    console.log(newData,'dat111');
    console.log('====================================');
    // if (data?.length>0) {
    //   // Update the existing record
    //   return 'askbjckvhjg'
    // } else if(newData){
    //   let newUserID=[user_id,...newData.user_id]
    //   let x=await ProductStatusModel.query().update({user_id: newUserID }).where('name', '=', name);
    //   console.log(x,'xxxxx');
    // }else {
    //   // Insert a new record
      return ProductStatusModel.query().insert({ name, user_id:user_id });
    // }
  }
  

  static async deleteCategoryName(id) {
    return ProductStatusModel.query().del().where('id','=',id);
  }
  

  static async getName(user_id) {
    return ProductStatusModel.query()
      .select('*')
      .where('user_id', '=', user_id)
      .orderBy('id')
      .returning('*');
  }

  static async getAllStatuses() {
    return ProductStatusModel.query().select('*').orderBy('id').returning('*');
  }
}

export default ProductStatusModel;
