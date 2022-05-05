import _ from 'lodash';

export const getAllStatistics = (list, data) => {
  const getStatisticData = ({ first_name, last_name }, position) => {
    return getStatisticsByName(list, `${last_name}, ${first_name}`, position);
  }

  const result = _.flattenDeep(
    _.map(_.keys(data), position =>
      _.map(_.get(data, `${position}.list`, []),
        _this => getStatisticData(_this, position)
      )
    )
  )

  return result;

  
};

export const getStatisticsByName = (list, name, position, keyName = 'full_name') => {
  const property = ['candidates', position, keyName].join('.');
  const filteredData = _.filter(list, [property, name]);
  const count = filteredData.length;

  return { name, position, count };
};
