import { create } from "zustand";
import { persist } from "zustand/middleware";

// 用户信息接口
interface User {
  id: string;
  username: string;
  role?: string;
}

// 用户状态接口
interface UserState {
  // 状态
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 操作
  login: (credentials: { username: string; password: string ; role?: string }) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// 创建用户状态管理 store
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 登录方法
      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          // 这里可以调用实际的登录 API
          // 示例：模拟登录请求
          const response = await mockLoginAPI(credentials);

          if (response.success) {
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.error || "登录失败",
            });
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "登录时发生错误",
          });
        }
      },

      // 登出方法
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      // 设置用户信息
      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
          error: null,
        });
      },

      // 清除错误信息
      clearError: () => {
        set({ error: null });
      },

      // 设置加载状态
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "user-storage", // 本地存储的键名
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }), // 只持久化用户信息和认证状态
    }
  )
);

// 模拟登录 API（实际使用时替换为真实的 API 调用）
async function mockLoginAPI(credentials: {
  username: string;
  password: string;
  role?: string;
}) {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 模拟验证逻辑
  if (credentials.password === "password") {
    return {
      success: true,
      user: {
        id: credentials.username,
        username: credentials.username,
        role: credentials.role
      },
    };
  } else {
    return {
      success: false,
      error: "用户名或密码错误",
    };
  }
}

// 导出一些常用的选择器
export const useUser = () => useUserStore((state) => state.user);
export const useIsAuthenticated = () =>
  useUserStore((state) => state.isAuthenticated);
export const useIsLoading = () => useUserStore((state) => state.isLoading);
export const useError = () => useUserStore((state) => state.error);
