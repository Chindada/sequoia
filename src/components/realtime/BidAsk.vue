<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const values = defineModel<number[][]>("values", { required: true });
const reverse = defineModel<boolean>("reverse", { default: false });

const chartOptions = ref();

onMounted(() => {
  chartOptions.value = setChartOptions();
});

const color = computed(() => {
  if (reverse.value) {
    return "--p-red-500";
  }
  return "--p-green-500";
});

const chartData = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement);
  return {
    labels: values.value[0],
    datasets: [
      {
        backgroundColor: documentStyle.getPropertyValue(color.value),
        borderColor: documentStyle.getPropertyValue(color.value),
        data: values.value[1]
      }
    ]
  };
});

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue("--p-text-muted-color");
  const surfaceBorder = documentStyle.getPropertyValue("--p-content-border-color");
  return {
    indexAxis: "y",
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    animation: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        reverse: reverse,
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        position: reverse.value ? "right" : "left",
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  };
};
</script>

<template>
  <Chart class="w-1/2" :data="chartData" :options="chartOptions" type="bar" />
</template>

<style lang="scss" scoped></style>
