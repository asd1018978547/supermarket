<template>
  <div>
    <div id="myCharts" ref="myCharts"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    //以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
    const myCharts = this.$echarts.init(this.$refs.myCharts);
    let options = {
      title: {
        text: "销售统计", //图表顶部的标题
        subtext: "不含退款" //副标题
      },
      tooltip: {
        //鼠标悬浮框的提示文字
        trigger: "axis"
      },
      xAxis: [
        {
          //x轴坐标数据
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          //y轴坐标数据
          type: "value",
          axisLabel: {
            formatter: "{value} ￥"
          }
        }
      ],
      series: [
        //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
        {
          name: "销售统计",
          type: "line", //pie->饼状图  line->折线图  bar->柱状图
          data: [90480, 50500, 62700, 43335, 35174, 253187, 13445]
        }
      ]
    };

    myCharts.setOption(options);
  }



};
</script>

<style lang="less" scoped>
#myCharts{
    width: 100%;
    height: 500px;
}
</style>