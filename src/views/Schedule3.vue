<template>
  <div class="app-container">
    <!-- 日期选择器 -->
    <div class="date-picker">
      <label for="date">选择日期：</label>
      <input type="date" id="date" v-model="selectedDate" @change="onDateChange" />
    </div>

    <!-- 时间轴 -->
    <div class="time-axis">
      <div v-for="time in timeSlots" :key="time" class="time-slot">
        {{ time }}
      </div>
    </div>

    <!-- 排班图表 -->
    <div class="schedule-chart">
      <div v-for="(shift, index) in shifts" :key="index" class="employee-row">
        <div class="employee-name">{{ shift.employeeName || '未分配' }}</div>
        <div class="shift-bars">
          <!-- 班次条 -->
          <div
              v-if="shift.startTime && shift.endTime"
              class="shift-bar"
              :style="calculateBarStyle(shift.startTime, shift.endTime)"
              @click="openShiftDetails(shift)"
              title="点击查看班次详情"
          ></div>

          <!-- 午餐时间条 -->
          <div
              v-if="shift.lunchStartTime && shift.lunchEndTime"
              class="lunch-bar"
              :style="calculateBarStyle(shift.lunchStartTime, shift.lunchEndTime)"
              title="午餐时间"
          ></div>

          <!-- 晚餐时间条 -->
          <div
              v-if="shift.dinnerStartTime && shift.dinnerEndTime"
              class="dinner-bar"
              :style="calculateBarStyle(shift.dinnerStartTime, shift.dinnerEndTime)"
              title="晚餐时间"
          ></div>
        </div>
      </div>
    </div>

    <!-- 班次详情弹窗 -->
    <div v-if="showShiftModal" class="modal-overlay">
      <div class="modal">
        <h3 class="modal-title">班次详情</h3>
        <div class="modal-content">
          <p><strong>开始时间:</strong> {{ selectedShift.startTime }}</p>
          <p><strong>结束时间:</strong> {{ selectedShift.endTime }}</p>
          <p><strong>是否有午餐:</strong> {{ selectedShift.lunchStartTime ? '是' : '否' }}</p>
          <p v-if="selectedShift.lunchStartTime"><strong>午餐时间:</strong> {{ selectedShift.lunchStartTime }} - {{ selectedShift.lunchEndTime }}</p>
          <p><strong>是否有晚餐:</strong> {{ selectedShift.dinnerStartTime ? '是' : '否' }}</p>
          <p v-if="selectedShift.dinnerStartTime"><strong>晚餐时间:</strong> {{ selectedShift.dinnerStartTime }} - {{ selectedShift.dinnerEndTime }}</p>
          <p><strong>当前员工:</strong> {{ selectedShift.employeeName || '未分配' }}</p>
        </div>

        <button class="modal-btn" @click="modifyEmployee">修改员工</button>

        <div v-if="employeeList.length > 0" class="employee-selection">
          <label for="employeeSelect">选择新员工：</label>
          <select v-model="selectedEmployee" id="employeeSelect">
            <option v-for="employee in employeeList" :key="employee.id" :value="employee.id">
              {{ employee.name }}
            </option>
          </select>
          <button class="modal-btn" @click="confirmChangeEmployee">确定</button>
        </div>

        <button class="modal-btn close-btn" @click="closeModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      timeSlots: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"],
      shifts: [],
      selectedDate: new Date().toISOString().slice(0, 10),
      showShiftModal: false,
      selectedShift: null,
      employeeList: [],
      selectedEmployee: null,
    };
  },
  methods: {
    onDateChange() {
      this.fetchSchedule(this.selectedDate);
    },
    async fetchSchedule(date) {
      try {
        const response = await axios.get(`/schedule/day?storeId=1&date=${date}`);
        if (response.data.code === 200) {
          this.shifts = response.data.data;
        } else {
          console.error("获取排班数据失败：", response.data.message);
        }
      } catch (error) {
        console.error("请求失败：", error);
      }
    },
    openShiftDetails(shift) {
      this.selectedShift = { ...shift };
      this.showShiftModal = true;
    },
    closeModal() {
      this.showShiftModal = false;
      this.selectedShift = null;
      this.employeeList = [];
      this.selectedEmployee = null;
    },
    async modifyEmployee() {
      if (!this.selectedShift) {
        console.error("没有选中的班次");
        return;
      }
      try {
        const response = await axios.get(`/schedule/available`, {
          params: { shiftId: this.selectedShift.id }
        });
        if (response.data.code === 200) {
          this.employeeList = response.data.data;
        } else {
          console.error("获取空闲员工失败：", response.data.message);
        }
      } catch (error) {
        console.error("请求失败：", error);
      }
    },
    async confirmChangeEmployee() {
      if (!this.selectedEmployee) {
        alert("请选择一个新员工");
        return;
      }
      try {
        const response = await axios.post('/schedule/update', null, {
          params: {
            shiftId: this.selectedShift.id,
            employeeId: this.selectedEmployee,
          }
        });
        if (response.data.code === 200) {
          alert("员工更换成功");
          this.closeModal();
          this.fetchSchedule(this.selectedDate);
        } else {
          console.error("更新员工失败：", response.data.message);
        }
      } catch (error) {
        console.error("请求失败：", error);
      }
    },
    calculateBarStyle(startTime, endTime) {
      const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      const totalMinutes = timeToMinutes("23:00") - timeToMinutes("08:00");
      const left = ((startMinutes - timeToMinutes("08:00")) / totalMinutes) * 100;
      const width = ((endMinutes - startMinutes) / totalMinutes) * 100;
      return {
        left: `${left}%`,
        width: `${width}%`,
        position: "absolute",
        height: "30px",
        borderRadius: "4px",
      };
    },
  },
  mounted() {
    this.fetchSchedule(this.selectedDate);
  },
};
</script>

<style scoped>
.app-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.date-picker {
  margin-bottom: 20px;
}

.date-picker input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.time-axis {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.time-slot {
  flex: 1;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.schedule-chart {
  display: flex;
  flex-direction: column;
}

.employee-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.employee-name {
  width: 80px;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
}

.shift-bars {
  flex: 1;
  position: relative;
  height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.shift-bar {
  position: absolute;
  top: 0;
  height: 30px;
  cursor: pointer;
  background-color: #01D4F2;
}

.lunch-bar {
  position: absolute;
  top: 0px;
  height: 30px;
  background-color: #FFC107;
  border-radius: 4px;
}

.dinner-bar {
  position: absolute;
  top: 0px;
  height: 30px;
  background-color: #4CAF50;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-title {
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.modal-content {
  margin-bottom: 15px;
}

.modal-btn {
  background: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.modal-btn:hover {
  background: #45a049;
}

.close-btn {
  background: #f44336;
}

.close-btn:hover {
  background: #e53935; /* 深红色背景 */
}

.employee-selection select {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
