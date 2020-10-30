import json
import pickle
import pandas as pd
import numpy as np


__cars='xyz'
__data_columns=None
__model=None
__target_encoder=None
__iqr_dict=None

def get_car_names():
    return __cars

def get_col_names():
    return __data_columns

def load_saved_artifacts():
    print('loading saved artifacts.......start')
    global __data_columns
    global __cars
    global __iqr_dict
    global __target_encoder
    global __model

    with open('./artifacts/train_cols.json', 'r') as f:
        __data_columns=json.load(f)

    with open('./artifacts/car_prices_model.pickle', 'rb') as f:
        __model = pickle.load(f)

    with open('./artifacts/target_encoder.pickle', 'rb') as f:
        __target_encoder = pickle.load(f)

    with open('./artifacts/iqr_dict.json', 'r') as f:
        __iqr_dict=json.load(f)

    with open('./artifacts/Cars.json', 'r') as f:
        __cars=json.load(f)

    print("loading saved artifacts.....done")




def get_selling_price(Model,vehicle_age,km_driven,fuel,transmission,owner,seller_type):
    
    col = ['Model', 'vehicle_age', 'km_driven', 'fuel', 'transmission', 'owner', 'seller_type']
    data = [[Model, vehicle_age, km_driven, fuel, transmission, owner, seller_type]]
    predict_df = pd.DataFrame(data, columns=col)
    for col in ['vehicle_age', 'km_driven']:
        fence_low = __iqr_dict[col + '_low']
        fence_high = __iqr_dict[col + '_high']
        predict_df.loc[((predict_df[col] < fence_low) | (predict_df[col] > fence_high)), 'outlier_flag'] = 'o_' + col
    predict_df['outlier_flag'].fillna(value='no_outlier', inplace=True)
    predict_df = __target_encoder.transform(predict_df)
    predict_df = pd.get_dummies(predict_df)
    missing = (set(__data_columns) - set(predict_df))
    for strn in missing:
        predict_df[strn] = 0
    # predict_df[X]=1#df[x].iloc[0,:].values
    return round(__model.predict(predict_df)[0], 0)
    


if __name__=='__main__':
    load_saved_artifacts()
    print(get_car_names())
    print(get_selling_price('Volkswagen Vento', 5, 10000, 'Diesel', 'Automatic', 'First Owner', 'Individual'))