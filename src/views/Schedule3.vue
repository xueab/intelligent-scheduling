<!--日排班-->
<!--修改排班-->
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
        <h3>班次详情</h3>
        <p><strong>开始时间:</strong> {{ selectedShift.startTime }}</p>
        <p><strong>结束时间:</strong> {{ selectedShift.endTime }}</p>
        <p><strong>是否有午餐:</strong> {{ selectedShift.lunchStartTime ? '是' : '否' }}</p>
        <p v-if="selectedShift.lunchStartTime"><strong>午餐时间:</strong> {{ selectedShift.lunchStartTime }} - {{ selectedShift.lunchEndTime }}</p>
        <p><strong>是否有晚餐:</strong> {{ selectedShift.dinnerStartTime ? '是' : '否' }}</p>
        <p v-if="selectedShift.dinnerStartTime"><strong>晚餐时间:</strong> {{ selectedShift.dinnerStartTime }} - {{ selectedShift.dinnerEndTime }}</p>
        <p><strong>当前员工:</strong> {{ selectedShift.employeeName || '未分配' }}</p>

        <button @click="modifyEmployee">修改员工</button>

        <div v-if="employeeList.length > 0">
          <label for="employeeSelect">选择新员工：</label>
          <select v-model="selectedEmployee" id="employeeSelect">
            <option v-for="employee in employeeList" :key="employee.id" :value="employee.id">
              {{ employee.name }}
            </option>
          </select>
          <button @click="confirmChangeEmployee">确定</button>
        </div>

        <button @click="closeModal">关闭</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      // 时间段（扩展到 23:00）
      // timeSlots: [
      //   "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
      //   "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
      //   "20:00", "21:00", "22:00", "23:00",
      // ],
      timeSlots: [
        "09:00", "11:00", "13:00",
        "15:00", "17:00", "19:00",
        "21:00",
      ],
      // 员工排班数据
      shifts: [],
      // 选中的日期（默认今天）
      selectedDate: new Date().toISOString().slice(0, 10),
      // 弹窗显示状态
      showShiftModal: false,
      // 当前选中的班次
      selectedShift: null,
      // 空闲员工列表
      employeeList: [],
      // 新选中的员工
      selectedEmployee: null,
    };
  },
  methods: {
    // 日期变更事件
    onDateChange() {
      this.fetchSchedule(this.selectedDate);
    },
    // 从后端获取排班数据
    async fetchSchedule(date) {
      try {
        const response = await axios.get(`/schedule/day?storeId=1&date=${date}`);
        if (response.data.code === 200) {
          this.shifts = response.data.data; // 更新排班数据
        } else {
          console.error("获取排班数据失败：", response.data.message);
        }
      } catch (error) {
        console.error("请求失败：", error);
      }
    },
    // 打开班次详情弹窗
    openShiftDetails(shift) {
      this.selectedShift = { ...shift }; // 克隆选中的班次
      this.showShiftModal = true; // 显示弹窗
    },
    // 关闭弹窗
    closeModal() {
      this.showShiftModal = false;
      this.selectedShift = null;
      this.employeeList = [];
      this.selectedEmployee = null;
    },
    // 点击修改员工按钮
    async modifyEmployee() {
      if (!this.selectedShift) {
        console.error("没有选中的班次");
        return;
      }

      try {
        const response = await axios.get(`/schedule/available`, {
          params: {
            shiftId: this.selectedShift.id // 传递班次ID
          }
        });

        if (response.data.code === 200) {
          this.employeeList = response.data.data; // 获取空闲员工列表
        } else {
          console.error("获取空闲员工失败：", response.data.message);
        }
      } catch (error) {
        console.error("请求失败：", error);
      }
    },
    // 确认更换员工
    async confirmChangeEmployee() {
      if (!this.selectedEmployee) {
        alert("请选择一个新员工");
        return;
      }

      try {
        const response = await axios.post(`/schedule/update`, {
          shiftId: this.selectedShift.id,
          employeeId: this.selectedEmployee,
        });
        if (response.data.code === 200) {
          alert("员工更换成功");
          this.closeModal(); // 关闭弹窗
          this.fetchSchedule(this.selectedDate); // 刷新排班数据
        } else {
          console.error("更新员工失败：", response.data.message);
        }
      } catch (error) {
        console.error("请求失败：", error);
      }
    },
    // 计算班次条的位置和宽度
    calculateBarStyle(startTime, endTime) {
      const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      // 时间范围调整为 08:00 - 23:00
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
    // 默认加载当前日期的排班数据
    this.fetchSchedule(this.selectedDate);
  },
};
</script>


<style scoped>
/* 容器样式 */
.app-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

/* 日期选择器样式 */
.date-picker {
  margin-bottom: 20px;
}

.date-picker input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* 时间轴样式 */
.time-axis {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
  padding-left: 80px; /* 给员工名字留出位置 */
}

.time-slot {
  flex: 1;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin-left: -1px;
}

/* 排班图表样式 */
.schedule-chart {
  display: flex;
  flex-direction: column;
}

/* 每个员工排班行 */
.employee-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

/* 员工姓名 */
.employee-name {
  width: 80px;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
}

/* 班次条容器 */
.shift-bars {
  flex: 1;
  position: relative;
  height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

/* 班次条样式 */
.shift-bar {
  position: absolute;
  top: 0;
  height: 30px;
  cursor: pointer;
  background-color: #01D4F2; /* 蓝色表示班次条 */
}

/* 午餐条样式（黄色） */
.lunch-bar {
  position: absolute;
  top: -10px; /* 显示在班次条上方 */
  height: 10px;
  background-color: #FFC107; /* 黄色表示午餐时间 */
  border-radius: 4px;
  z-index: 2;
}

/* 晚餐条样式（绿色） */
.dinner-bar {
  position: absolute;
  top: -20px; /* 显示在午餐条上方 */
  height: 10px;
  background-color: #4CAF50; /* 绿色表示晚餐时间 */
  border-radius: 4px;
  z-index: 2;
}

/* 弹窗样式 */
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
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.modal select {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}

.modal button {
  background: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal button:hover {
  background: #45a049;
}
</style>
